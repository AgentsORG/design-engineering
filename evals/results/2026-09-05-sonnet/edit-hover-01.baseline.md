```css
.card {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.3);
}
```

Swapped `ease-in` for `ease-out` and dropped `transition: all` in favor of naming `transform` and `box-shadow` explicitly. `ease-in` starts slow and accelerates, which feels sluggish for a hover response that should read as immediate; `ease-out` starts fast and settles, matching how a physical object would rise off the surface. Naming the properties avoids animating unrelated changes (like color or padding) that `all` would silently pick up, and trimming the duration from 0.3s to 0.2s keeps the lift feeling snappy rather than laggy on such a small movement.
