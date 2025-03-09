import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const dropDownTabs = [
  { title: 'About', link: '/about-us' },
  { title: 'Contact', link: '/contact' },
  { title: 'Listing', link: '/Listing' },
  { title: 'Terms of Service', link: '/terms-of-service' },
]


export const DropDownTab = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Update dropdown position
  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4, // Position below the button
        left: rect.left + window.scrollX - 80, // Align left with the button
      })
    }
  }

  // Open dropdown and update position
  const handleToggleDropdown = () => {
    updateDropdownPosition()
    setShowDropDown(prev => !prev)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Dropdown Toggle Button */}
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        className="flex gap-2 items-center py-3 px-4 text-tertiary-text font-geist font-normal text-sm leading-[22px]"
      >
        <p>Others</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          className={`transition-transform duration-200 ${showDropDown ? 'rotate-180' : ''}`}
        >
          <path
            d="M3 5.00002L6.00001 8L9.00001 5"
            stroke="#8C919A"
            strokeWidth="1.5"
            strokeMiterlimit="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu (positioned absolutely outside the button div) */}
      {showDropDown && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: '160px',
          }}
          className="bg-white border border-primary-stroke  shadow-lg z-50"
        >
          {dropDownTabs.map(tab => (
            <Link
              key={nanoid()}
              href={tab.link}
              className="block py-[10px] px-3 text-tertiary-text font-geist font-normal text-sm leading-[22px] hover:bg-gray-100"
              onClick={() => setShowDropDown(false)}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
