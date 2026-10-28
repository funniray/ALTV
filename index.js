const codeInput = document.getElementById("code")
codeInput.addEventListener("input", checkCode)
document.getElementById("form").addEventListener("submit", submit)

function submit(e) {
    e.preventDefault()
    const code = codeInput.value.replaceAll(" ","")
    const segments = decode(code)
    segments.pop()
    redirect(segments.join("."))
}

function checkCode() {
    const code = codeInput.value.replaceAll(" ","")
    if (code.length != 10) {
        codeInput.setCustomValidity(`Invalid code length ${code.length}`)
        return
    }

    const segments = decode(code)
    const checksum = segments.pop()

    const validChecksum = getChecksum(segments)
    if (checksum != validChecksum) {
        codeInput.setCustomValidity(`Invalid checksum`)
        return
    }

    codeInput.setCustomValidity("")
}

function redirect(ip) {
    if (!window.location.href.includes("#")) {
        console.log("Invalid redirect, url doesn't contain #")
        return
    }
    const pathSplit = window.location.href.split("#")
    const params = pathSplit[pathSplit.length-1]
    const redir = `http://${ip}:9999/anilist?${params}`
    console.log("Redirecting to "+redir)
    window.location.href = redir
}

function getChecksum(input) {
    let result = 0x00
    for (let i=0; i<input.length; i++) {
        result ^= input[i]
    }
    return result
}

function decode (hex = '') {
  const result = []
  for (let i = 0; i < hex.length; i += 2) {
    console.log(hex.substring(i, i+2))
    result.push(parseInt(hex.substring(i, i+2), 16))
  }
  return result
}
