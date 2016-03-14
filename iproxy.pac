function FindProxyForURL(url, host)
{
if (shExpMatch(host, "localhost") || isInNet(host,"127.*", "255.0.0.0") ) {
   return "DIRECT";
} else if (isInNet(host, "10.0.0.0", "255.0.0.0")) {
  return "DIRECT";
} else if (shExpMatch(host, "*.iitm.ac.in")) {
  return "DIRECT";
} else if (shExpMatch(host, "*google*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*youtube*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*youtu.be*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*.ytimg.com*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*facebook*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*fbcdn*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*github*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*quora*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*wiki*")) {
  return "DIRECT";
} else if (shExpMatch(host, "*lifehacker*")) {
  return "DIRECT";
} else if ((shExpMatch(host, "*amazon*")) || (shExpMatch(host, "*flipkart*")) || (shExpMatch(host, "*ebay*")) ) {
  return "DIRECT";
} else if ( (shExpMatch(host, "*10.21.211.201")) || (shExpMatch(host, "*ajp.aapt.org")) || (shExpMatch(host, "*apex.jsap.jp")) || (shExpMatch(host, "*arc.aiaa.org")) || (shExpMatch(host, "*asadl.org")) || (shExpMatch(host, "*ascelibrary.org")) || (shExpMatch(host, "*asmedigitalcollection.asme.org")) || (shExpMatch(host, "*bookstore.teriin.org")) || (shExpMatch(host, "*chaos.aip.org")) || (shExpMatch(host, "*commodities.cmie.com")) || (shExpMatch(host, "*compass.astm.org")) || (shExpMatch(host, "*content.yudu.com")) || (shExpMatch(host, "*dev.biologists.org")) || (shExpMatch(host, "*economicoutlook.cmie.com")) || (shExpMatch(host, "*epubs.siam.org")) || (shExpMatch(host, "*f1000.com")) || (shExpMatch(host, "*genesdev.cshlp.org")) || (shExpMatch(host, "*genome.cshlp.org")) || (shExpMatch(host, "*ieeexplore.ieee.org")) || (shExpMatch(host, "*inderscience.metapress.com")) || (shExpMatch(host, "*iopscience.iop.org")) || (shExpMatch(host, "*isiknowledge.com")) || (shExpMatch(host, "*jeb.biologists.org")) || (shExpMatch(host, "*jes.ecsdl.org")) || (shExpMatch(host, "*jjap.jsap.jp")) || (shExpMatch(host, "*journalofrheology.org")) || (shExpMatch(host, "*journals.cambridge.org")) || (shExpMatch(host, "*.asm.org")) || (shExpMatch(host, "*learning.bmj.com")) || (shExpMatch(host, "*link.springer.com")) || (shExpMatch(host, "*mansci.journal.informs.org")) || (shExpMatch(host, "*mor.journal.informs.org")) || (shExpMatch(host, "*muse.jhu.edu")) || (shExpMatch(host, "*onlinelibrary.wiley.com")) || (shExpMatch(host, "*or.journal.informs.org")) || (shExpMatch(host, "*.sagepub.com")) || (shExpMatch(host, "*.aip.org")) || (shExpMatch(host, "*portal.acm.org")) || (shExpMatch(host, "*.aps.org")) || (shExpMatch(host, "*projecteuclid.org")) || (shExpMatch(host, "*psycnet.apa.org")) || (shExpMatch(host, "*pubs.acs.org")) || (shExpMatch(host, "*pubs.rsc.org")) || (shExpMatch(host, "*.oxfordjournals.org")) || (shExpMatch(host, "*rspa.royalsocietypublishing.org")) || (shExpMatch(host, "*rsta.royalsocietypublishing.org")) || (shExpMatch(host, "*search.epnet.com")) || (shExpMatch(host, "*search.proquest.com")) || (shExpMatch(host, "*site.securities.com")) || (shExpMatch(host, "*statesofindia.cmie.com")) || (shExpMatch(host, "*transci.journal.informs.org")) || (shExpMatch(host, "*www.aeaweb.org")) || (shExpMatch(host, "*www.ams.org")) || (shExpMatch(host, "*www.capitaline.com")) || (shExpMatch(host, "*www.cenlib.iitm.ac.in")) || (shExpMatch(host, "*www.crisil.com")) || (shExpMatch(host, "*www.degruyter.com")) || (shExpMatch(host, "*www.ecsdl.org")) || (shExpMatch(host, "*www.electrochem.org")) || (shExpMatch(host, "*www.emeraldinsight.com")) || (shExpMatch(host, "*www.icevirtuallibrary.com")) || (shExpMatch(host, "*www.iijournals.com")) || (shExpMatch(host, "*www.jstor.org")) || (shExpMatch(host, "*www.maneyonline.com")) || (shExpMatch(host, "*www.mendeley.com")) || (shExpMatch(host, "*www.mitpressjournals.org")) || (shExpMatch(host, "*www.nature.com")) || (shExpMatch(host, "*www.nowpublishers.com")) || (shExpMatch(host, "*www.onepetro.org")) || (shExpMatch(host, "*www.opticsinfobase.org")) || (shExpMatch(host, "*www.palgrave-journals.com")) || (shExpMatch(host, "*www.pdcnet.org")) || (shExpMatch(host, "*www.physicstoday.org")) || (shExpMatch(host, "*www.rina.org.uk")) || (shExpMatch(host, "*www.rsc.org")) || (shExpMatch(host, "*www.sciencedirect.com")) || (shExpMatch(host, "*www.scopus.com")) || (shExpMatch(host, "*www.tandfonline.com")) || (shExpMatch(host, "*www.thomsoninnovation.com")) || (shExpMatch(host, "*www.uptodate.com")) || (shExpMatch(host, "*www.worldscinet.com")) || (shExpMatch(host, "*www1.asminternational.org")) || (shExpMatch(host, "*scifinder.cas.org")) || (shExpMatch(host, "*turnitin.com")) || (shExpMatch(host, "*www.jstage.jst.go.jp")) ) {
  return "PROXY hproxy.iitm.ac.in:3128" ;
} else {
  return "DIRECT";
}

}
