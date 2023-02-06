import React, { useState } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

type ScanResult = "triple" | "double" | "single" | "none"

type Node = {
    name: string
} & Record<ScanResult, number[]>

type CheckMap = {
    node: typeof Node["name"]
    triple?: CheckMap
    double?: CheckMap
    single?: CheckMap
    none?: CheckMap
}

type Location = {
    name: string
    mapImage: string
    nodes: Node[]
    checkMap: CheckMap
}

type Step = {
    node?: typeof Node["name"]
    result: ScanResult
}

const locations: Location[] = [
    {
        name: "Dorgesh-Kaan",
        mapImage: "./imgs/Dorgesh-Kaan/full.jpg",
        nodes: [
            {
                name: "A",
                triple: [1, 2, 3, 4, 5],
                double: [6, 7],
                single: [8, 9, 10, 11, 12],
                none: [13, 14, 15, 16, 17, 18, 19, 20]
            },
            {
                name: "B",
                triple: [6],
                double: [7],
                single: [],
                none: []
            },
            {
                name: "C",
                triple: [],
                double: [8, 9, 10],
                single: [11, 12],
                none: []
            },
            {
                name: "D",
                triple: [],
                double: [8, 9, 10, 11],
                single: [12],
                none: []
            },
            {
                name: "E",
                triple: [8, 9],
                double: [10],
                single: [],
                none: []
            },
            {
                name: "F",
                triple: [13, 14],
                double: [14, 15, 19],
                single: [],
                none: []
            },
            {
                name: "G",
                triple: [14],
                double: [15, 19],
                single: [],
                none: []
            },
            {
                name: "H",
                triple: [15],
                double: [16, 17, 19],
                single: [18, 20],
                none: []
            },
            {
                name: "I",
                triple: [],
                double: [18],
                single: [20],
                none: []
            }
        ],
        checkMap: {
            node: "A",
            double: { node: "B" },
            single: {
                node: "C",
                double: {
                    node: "D",
                    double: { node: "E" }
                },
                single: { node: "D" }
            },
            none: {
                node: "F",
                double: {
                    node: "G",
                    double: { node: "H" }
                },
                single: {
                    node: "H",
                    single: { node: "I" }
                }
            }
        }
    }
]

function App() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [location, setLocation] = useState<typeof locations[number]>()
    const [steps, setSteps] = useState<Step[]>([])

    let currentStep = location?.checkMap
    let possible = location
        ? (["triple", "double", "single", "none"] as ScanResult[]).flatMap(
              (result) => location.nodes.find(({ name }) => name === location.checkMap.node)[result]
          )
        : []

    for (let i = 0; i < steps.length; i++) {
        const node = location.nodes.find(({ name }) => name === steps[i].node)

        if (node) {
            possible = possible.filter((item) => node[steps[i].result].includes(item))
        }

        currentStep = currentStep[steps[i].result]
    }
    return (
        <>
            <h1 className="nistext" style={{ margin: 5, padding: 5 }}>
                Elite scans
            </h1>
            <div
                className="nisbutton"
                onClick={() => {
                    setDropdownOpen(!dropdownOpen)
                    setLocation(undefined)
                    setSteps([])
                }}
            >
                Region select
            </div>
            {dropdownOpen && (
                <div style={{ display: "flex", flexDirection: "column", border: "solid", margin: 5, padding: 5 }}>
                    {locations.map((option) => (
                        <div
                            key={option.name}
                            className="nisbutton"
                            onClick={() => {
                                setLocation(option)
                                setDropdownOpen(!dropdownOpen)
                                setSteps([])
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
            {console.log(currentStep)}
            {possible.length > 0 && (
                <div
                    style={{ height: "80vh", margin: 5, padding: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
                >
                    {currentStep && <h3>{`Check ${currentStep.node}`}</h3>}
                    <div style={{ height: "50vh", overflow: "auto", visibility: "visible" }}>
                        <TransformWrapper initialScale={1.0} centerOnInit={true} limitToBounds={false} minScale={0.1}>
                            <TransformComponent>
                                <img src={location?.mapImage} width="50%" alt="austic" />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                    <div style={{ display: "flex", height: "5vh" }}>
                        {(["triple", "double", "single", "none"] as ScanResult[]).map((result) => (
                            <div key={result} className="nisbutton" onClick={() => setSteps([...steps, { node: currentStep.node, result }])}>
                                {result}
                            </div>
                        ))}
                    </div>
                    <h3 style={{ display: "flex", height: "5vh" }}>{possible.join(", ")}</h3>
                </div>
            )}
        </>
    )
}
export default App
