import { whatsApp } from '../data/profile'

/*
 * WhatsApp glyph from Bootstrap Icons, https://icons.getbootstrap.com/icons/whatsapp/
 * Copyright (c) 2019-2024 The Bootstrap Authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

interface WhatsAppLinkProps {
  className: string
  showNumber?: boolean
}

export function WhatsAppLink({ className, showNumber = false }: WhatsAppLinkProps) {
  return <a
    className={className}
    href={whatsApp.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={showNumber ? `Contact me on WhatsApp at ${whatsApp.number}` : 'Contact me on WhatsApp'}
  >
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.99 0C3.625 0 .068 3.556.064 7.922c0 1.398.366 2.758 1.057 3.963L0 16l4.21-1.104a7.9 7.9 0 0 0 3.777.96h.003c4.366 0 7.923-3.557 7.927-7.927A7.9 7.9 0 0 0 13.6 2.326zM7.99 14.514a6.6 6.6 0 0 1-3.353-.918l-.24-.144-2.497.655.667-2.435-.156-.251a6.56 6.56 0 0 1-1.007-3.503c0-3.624 2.957-6.58 6.59-6.58a6.56 6.56 0 0 1 4.657 1.928 6.56 6.56 0 0 1 1.928 4.657c-.004 3.637-2.96 6.59-6.59 6.59m3.614-4.931c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.373-.114-.197-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.528.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.993.47.205.84.326 1.129.418.475.152.907.13 1.25.08.38-.057 1.17-.48 1.337-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
    {showNumber && whatsApp.number}
  </a>
}
