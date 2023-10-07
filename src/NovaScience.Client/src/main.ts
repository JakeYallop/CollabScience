import './style.css'
import './colors.css'

import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>CollabScience - Find your perfect science project</h1>
    <button>Get Started</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
