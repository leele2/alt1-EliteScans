import React, { useState } from "react"

const options = ["option 1", "option 2", "option 3"] as const

const Dropdown: React.FC<{ options: string[] }> = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [option, setOption] = useState<typeof options[number]>()

    return (
        <div>
            <h1>Eliete scans</h1>

            <button
                onClick={() => {
                    setDropdownOpen(!dropdownOpen)
                    setOption(undefined)
                }}
            >
                Region select
            </button>

            {dropdownOpen && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {options.map((option) => (
                        <button
                            onClick={() => {
                                setOption(option)
                                setDropdownOpen(!dropdownOpen)
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {option && <h4>{`${option} selected`}</h4>}
        </div>
    )
}

export default App
