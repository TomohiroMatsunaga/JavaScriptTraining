function resize1(params) {
    let maxWidth = (params && params.maxWidth) || 600;
    let maxHeight = (params && params.maxHeight) || 480;
  
    console.log({ maxWidth, maxHeight });
  }

  function resize2(params) {
    let maxWidth = params?.maxWidth ?? 600;
    let maxHeight = params?.maxHeight ?? 480;
  
    console.log({ maxWidth, maxHeight });
  }
  