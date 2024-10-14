const CustomModelFetcher = async (path) => {
    let arrayBuf = await fetchModel(path);
   return copyArrayBuffer(arrayBuf);
  }
  
  const fetchModel = (path) => {
    return fetch(path).then((model) => model.arrayBuffer());
  }

  const copyArrayBuffer = (original) => {
    var arrayBuffer = new ArrayBuffer(original.byteLength);
    new Uint8Array(arrayBuffer).set(new Uint8Array(original));
    return arrayBuffer;
  }
  
  const _customModelFetcher = CustomModelFetcher;
  export { _customModelFetcher as customModelFetcher };
