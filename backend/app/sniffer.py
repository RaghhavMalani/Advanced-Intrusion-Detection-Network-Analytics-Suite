from scapy.all import sniff, IP, TCP, UDP, ICMP, raw
from datetime import datetime, timedelta
from collections import defaultdict

# Tracking state
connection_tracker = defaultdict(list)
packet_count = defaultdict(int)

# Thresholds
PORT_SCAN_THRESHOLD = 10
PACKET_FLOOD_THRESHOLD = 50
FLOOD_TIME_WINDOW = timedelta(seconds=5)

def packet_callback(packet, socketio=None):
    if packet.haslayer(IP):
        ip_src = packet[IP].src
        ip_dst = packet[IP].dst
        proto = "OTHER"

        if packet.haslayer(TCP):
            proto = "TCP"
        elif packet.haslayer(UDP):
            proto = "UDP"
        elif packet.haslayer(ICMP):
            proto = "ICMP"

        # Calculate total packet length
        ip_total_len = packet[IP].len  # Total IP packet length
        ip_header_len = packet[IP].ihl * 4  # IP header length
        payload_len = ip_total_len - ip_header_len  # Payload length

        event = {
            "src": ip_src,
            "dst": ip_dst,
            "time": datetime.now().isoformat(),
            "protocol": proto,
            "length": ip_total_len,  # Use total IP packet length
            "details": {
                "ip_header_len": ip_header_len,
                "payload_len": payload_len
            }
        }

        now = datetime.now()

        # --- Port scan detection (TCP) ---
        if packet.haslayer(TCP):
            dport = packet[TCP].dport
            connection_tracker[ip_src].append((dport, now))

            # Keep only last few seconds
            connection_tracker[ip_src] = [
                (p, t) for (p, t) in connection_tracker[ip_src]
                if now - t < timedelta(seconds=10)
            ]

            unique_ports = {p for (p, _) in connection_tracker[ip_src]}
            if len(unique_ports) > PORT_SCAN_THRESHOLD:
                event["anomaly"] = f"Possible port scan: {len(unique_ports)} ports in 10s"

        # --- Packet flood detection ---
        packet_count[ip_src] += 1
        if packet_count[ip_src] == 1:
            connection_tracker[ip_src + "_start"] = now

        elif packet_count[ip_src] > PACKET_FLOOD_THRESHOLD:
            start_time = connection_tracker[ip_src + "_start"]
            if now - start_time < FLOOD_TIME_WINDOW:
                event["anomaly"] = f"Possible packet flood: {packet_count[ip_src]} packets in 5s"
                packet_count[ip_src] = 0  # Reset count after flagging

        # --- Uncommon protocol ---
        if proto == "OTHER":
            event["anomaly"] = "Unusual Protocol Detected"

        print(f"[+] Packet: {proto} | Length: {ip_total_len} bytes | {ip_src} -> {ip_dst}")
        if socketio:
            socketio.emit('packet', event)

def start_sniffer(socketio):
    print("[*] Sniffer started on interface 'lo'...")
    sniff(iface="lo", prn=lambda pkt: packet_callback(pkt, socketio), store=False)
