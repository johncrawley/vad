const nonMinified = () => {
  return {
    mode: "none",
    entry: { worklet: "./dist/worklet.js" },
    output: {
      filename: `vad.worklet.bundle.js`,
    },
  }
}

module.exports = nonMinified
