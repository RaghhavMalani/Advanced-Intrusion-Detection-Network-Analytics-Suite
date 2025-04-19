# app/analysis.py
from scapy.packet import Packet
from scapy.layers.inet import IP, TCP, UDP
from scapy.layers.dns import DNS
from scapy.layers.http import HTTPRequest

def analyze_packet(packet: Packet) -> dict:
    result = {
        "summary": packet.summary(),
        "protocol": "Unknown",
        "details": {},
        "suspicious": False
    }

    if IP in packet:
        result["protocol"] = packet[IP].proto
        result["details"]["src"] = packet[IP].src
        result["details"]["dst"] = packet[IP].dst

    if TCP in packet:
        result["protocol"] = "TCP"
        result["details"]["sport"] = packet[TCP].sport
        result["details"]["dport"] = packet[TCP].dport
    elif UDP in packet:
        result["protocol"] = "UDP"
        result["details"]["sport"] = packet[UDP].sport
        result["details"]["dport"] = packet[UDP].dport

    if DNS in packet:
        result["protocol"] = "DNS"
        result["details"]["dns_query"] = str(packet[DNS].qd.qname)

    if packet.haslayer(HTTPRequest):
        result["protocol"] = "HTTP"
        result["details"]["host"] = packet[HTTPRequest].Host.decode()
        result["details"]["path"] = packet[HTTPRequest].Path.decode()

    # Mark suspicious patterns (simple example)
    if result["protocol"] == "TCP" and packet[TCP].flags == "S":
        result["suspicious"] = True

    return result
