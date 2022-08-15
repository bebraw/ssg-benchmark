function range(n: number, customizer = (i: number) => i) {
  return Array.from(Array(n), (_, i) => customizer(i));
}

export { range };
