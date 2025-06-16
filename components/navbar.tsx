"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-amber-900 text-amber-50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center group"
            onClick={(e) => {
              // Se for um clique triplo, redirecionar para admin
              if (e.detail === 3) {
                e.preventDefault()
                window.location.href = "/admin/login"
              }
            }}
          >
            <div className="relative">
              <span className="text-xl sm:text-2xl font-bold tracking-tight relative z-10 text-amber-50 group-hover:text-amber-200 transition-colors">
                Carvalho
              </span>
              <span className="text-xl sm:text-2xl font-light italic tracking-wide ml-1.5 sm:ml-2 text-amber-100 group-hover:text-amber-300 transition-colors">
                Móveis
              </span>
              <div className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-0.5 bg-amber-400 group-hover:bg-amber-300 transition-colors"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <NavLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-50 p-2 touch-manipulation"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-amber-800 py-4 border-t border-amber-700">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <NavLinks mobile onClick={toggleMenu} />
          </div>
        </nav>
      )}
    </header>
  )
}

function NavLinks({ mobile = false, onClick = () => {} }) {
  const links = [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium hover:text-amber-200 transition-colors touch-manipulation flex items-center gap-2 ${
            mobile ? "block py-2 text-base" : "text-sm lg:text-base"
          }`}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}
