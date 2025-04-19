# app/test_analysis.py
from scapy.layers.inet import IP, TCP
from scapy.packet import Packet
# test_analysis.py
from analysis import analyze_packet


def test_tcp_packet():
    pkt = IP(src="1.1.1.1", dst="2.2.2.2") / TCP(sport=1234, dport=80)
    result = analyze_packet(pkt)
    assert result["protocol"] == "TCP"
    assert result["details"]["src"] == "1.1.1.1"
    assert result["details"]["dport"] == 80
    print("Test passed.")

if __name__ == "__main__":
    test_tcp_packet()
