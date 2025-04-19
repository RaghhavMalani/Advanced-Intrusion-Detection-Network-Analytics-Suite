# app/sniffer.py
from scapy.all import sniff
from .analysis import analyze_packet
import json

def start_sniffing(callback, interface="lo"):
    def packet_handler(packet):
        analyzed = analyze_packet(packet)
        callback(json.dumps(analyzed))

    sniff(prn=packet_handler, store=False, iface=interface)
