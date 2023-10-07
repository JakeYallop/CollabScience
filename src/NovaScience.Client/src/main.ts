import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>NovaScience - Find your perfect science project</h1>
    <button>Get Started</button>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
