"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Package, Info, Phone, Search } from "lucide-react"
import SearchDialog from "./search-dialog"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/produtos", label: "Produtos", icon: Package },
    { href: "/sobre", label: "Sobre", icon: Info },
    { href: "/contato", label: "Contato", icon: Phone },
  ]

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-amber-600">Carvalho</div>
              <div className="text-2xl font-light text-gray-700">Móveis</div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <Search size={18} />
                <span>Buscar</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-700 hover:text-amber-600 focus:outline-none focus:text-amber-600"
                aria-label="Buscar produtos"
              >
                <Search size={24} />
              </button>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-amber-600 focus:outline-none focus:text-amber-600"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    setSearchOpen(true)
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 w-full px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  <Search size={20} />
                  <span>Buscar Produtos</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
