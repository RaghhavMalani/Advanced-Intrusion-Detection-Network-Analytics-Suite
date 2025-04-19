from scapy.all import sniff, IP

def packet_callback(packet):
    if packet.haslayer(IP):
        print(f"{packet[IP].src} -> {packet[IP].dst}")

sniff(iface='lo', prn=packet_callback, store=False)
