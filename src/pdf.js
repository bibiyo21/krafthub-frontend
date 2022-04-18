import jsPDF from 'jspdf'
export default pdf({data, headers, filename}) {
  const doc = new jsPDF()
  doc.save(filename)
}
