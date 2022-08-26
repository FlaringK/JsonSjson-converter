let sjsonToJson = () => {
  let text = document.getElementById("input").value
  document.getElementById("output").value = ""
  
  text = text.replace(/,\s*}/g, "\n}").replace(/,\s*]/g, "\n]") // Get rid of leading ,
  text = text.replace(/\/\*.*?\*\//g, "") // Remove all comments
  text = text.replace(/{/g, "{ ") // Add white space before {
  text = text.replace(/\\/g, "\\\\") // Escape all \ characters
  text = text.replace(/(\s)([^\s\"]*)\s*=\s*/g, "\n\$1\"\$2\": ") // Add quotation marks to each key and swap = to :
  text = text.replace(/[^\s{\[/]\s*\n/g, "\$&,").replace(/\n,/g, ",\n") // Add , at the end of each value
  text = text.replace(/,\s*}/g, "\n}").replace(/,\s*]/g, "\n]") // Get rid of leading ,

  try {
    let jsonData = JSON.parse(text)
    document.getElementById("output").value = JSON.stringify(jsonData, null, "\t")
  } catch (err) {
    console.log(err)
    document.getElementById("output").value = "Error parsing SJSON (Check console log)"
  }
  
}


let jsonToSjson = () => {
  let text = document.getElementById("input").value
  document.getElementById("output").value = ""

  let jsonData

  try {
    jsonData = JSON.parse(text)
  } catch (err) {
    console.log(err)
    document.getElementById("output").value = "Error parsing JSON (Check console log)"
  }

  if (jsonData) {

    text = JSON.stringify(jsonData, null, "\t")

    text = text.replace(/\t"(.*?)": /g, "\t\$1 = ") // Remove quotation marks around keys and swap : to =
    text = text.replace(/,\n/g, "\n") // Remove all , between values
    text = text.replace(/\\\\/g, "\\") // unescape all escaped \

    document.getElementById("output").value = text

  }
}