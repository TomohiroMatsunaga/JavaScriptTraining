export function add(c1, c2) {
  return {
    real: c1.real + c2.real,
    imaginary: c1.imaginary + c2.imaginary
  };
}

export function sub(c1, c2) {
  return {
    real: c1.real - c2.real,
    imaginary: c1.imaginary - c2.imaginary
  };
}

export function mul(c1, c2) {
  return {
    real: c1.real * c2.real - c1.imaginary * c2.imaginary,
    imaginary: c1.real * c2.imaginary + c1.imaginary * c2.real
  };
}

export function div(c1, c2) {
  const denominator = c2.real * c2.real + c2.imaginary * c2.imaginary;
  return {
    real: (c1.real * c2.real + c1.imaginary * c2.imaginary) / denominator,
    imaginary: (c1.imaginary * c2.real - c1.real * c2.imaginary) / denominator
  };
}
