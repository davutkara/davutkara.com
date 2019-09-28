export default function svg(title, category, responsive = true) {
  const wordLimitByLine = 4

  const titleArray = title.split(' ')
  let multiLineTitle
  const lineCount = Math.ceil(titleArray.length / wordLimitByLine)
  for (let i = 0; i < lineCount; i++) {
    multiLineTitle += `<tspan x="50%" y="${50 - lineCount * 6.3}%" dy="${i *
      32}pt" dominant-baseline="middle" text-anchor="middle">`

    for (let wc = 0; wc < wordLimitByLine; wc++) {
      const word = titleArray[wc + wordLimitByLine * i]
      multiLineTitle += word ? word + ' ' : ''
    }

    multiLineTitle += `</tspan>`
  }

  return `
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" ${
    responsive
      ? `preserveAspectRatio="none" viewBox="0 0 507 265"`
      : `width="507" height="265`
  }>
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
  <defs>
     <linearGradient id="grad1"  gradientTransform="rotate(41)">
        <stop offset="0%" style="stop-color:rgb(255,5,97);stop-opacity:1"/>
      
        <stop offset="70%" style="stop-color:rgb(255,82,87);stop-opacity:1"/>
    </linearGradient>
  </defs>
 
 <g>
  <title>Svg Test</title>
  <rect id="svg_2" height="264" width="507" y="-0.000005" x="-2.000015" fill="url(#grad1)"/>
  <text 
  xml:space="preserve" 
    font-family='BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif' 
    font-size="28" 
    id="svg_3" 
    font-weight="bold"     
    fill="#ffffff"
  >
  
  ${multiLineTitle}
  </text>
  <rect rx="20" id="svg_4" height="38" width="${
    category.width
  }" y="207.9375" x="23" stroke-opacity="null" fill="rgb(255,82,87)"/>
    <text xml:space="preserve" 
    text-anchor="start" 
    font-family='BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
    font-size="16" 
    id="svg_6" 
    y="232.9375" x="37.140625" 
    fill="#ffffff"
  >${category.title}</text>

 <text xml:space="preserve" 
    text-anchor="start" 
    font-family='BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
    font-size="16" 
    id="svg_6" 
    y="${50 + lineCount * 5}%" x="63%"
    fill="#ffffff"
  >davutkara.com</text>
 </g>
</svg>
`
}
