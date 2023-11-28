const handleReadFileAsync = async (e) => {
  function readFileAsync() {
    return new Promise((resolve, reject) => {
      const file = e.target.files[0]
      if (!file) {
        return resolve()
      }
      const reader = new FileReader()

      reader.onload = () => {
        resolve({
          url: `data:${file.type};base64,${btoa(reader.result)}`,
          file
        })
      }

      reader.onerror = reject

      reader.readAsBinaryString(file)
    })
  }

  return await readFileAsync()
}

export default handleReadFileAsync
