import React, { useState, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import * as alt1 from "@alt1/base"

type ScanResult = "triple" | "double" | "single" | "none"

type Node = {
    name: string
} & Record<ScanResult, number[]>

type CheckMap = {
    node: (typeof Node)["name"]
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
    node?: (typeof Node)["name"]
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
    },
    {
        name: "Kharazi Jungle",
        mapImage: "./imgs/Khazi/full.jpg",
        nodes: [
            {
                name: "A",
                triple: [1],
                double: [2, 3, 4, 5, 6, 7, 8, 9],
                single: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                none: []
            },
            {
                name: "B",
                triple: [2, 3, 4],
                double: [5, 6, 7, 8, 10, 11, 12],
                single: [9, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                none: []
            },
            {
                name: "C",
                triple: [],
                double: [6, 7, 8],
                single: [],
                none: []
            },
            {
                name: "D",
                triple: [6, 7],
                double: [8],
                single: [],
                none: []
            },
            {
                name: "E",
                triple: [10, 11],
                double: [12],
                single: [],
                none: []
            },
            {
                name: "F",
                triple: [],
                double: [13],
                single: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
                none: []
            },
            {
                name: "G",
                triple: [14, 15, 16, 17, 18, 19],
                double: [20],
                single: [21, 22, 23, 24, 25, 26],
                none: []
            },
            {
                name: "H",
                triple: [21],
                double: [22],
                single: [23, 24, 25, 26],
                none: []
            },
            {
                name: "I",
                triple: [],
                double: [23, 24],
                single: [25, 26],
                none: []
            },
            {
                name: "J",
                triple: [],
                double: [23],
                single: [24],
                none: []
            }
        ],
        checkMap: {
            node: "A",
            double: {
                node: "B",
                double: {
                    node: "C",
                    double: { node: "D" }
                }
            },
            single: {
                node: "B",
                double: { node: "E" },
                single: {
                    node: "F",
                    single: {
                        node: "G",
                        single: {
                            node: "H",
                            single: {
                                node: "I",
                                double: { node: "J" }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: "Zanaris",
        mapImage: "./imgs/Zanaris/full.jpg",
        nodes: [
            {
                name: "A",
                triple: [1, 2, 3, 4],
                double: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                single: [18, 19, 20, 21, 22],
                none: []
            },
            {
                name: "B",
                triple: [10],
                double: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                single: [17],
                none: []
            },
            {
                name: "C",
                triple: [5, 6, 7],
                double: [8, 9, 10, 11, 12, 14, 15],
                single: [13, 16],
                none: []
            },
            {
                name: "D",
                triple: [8, 9, 10],
                double: [11, 12, 13],
                single: [14, 15, 16],
                none: []
            },
            {
                name: "E",
                triple: [11],
                double: [12],
                single: [],
                none: []
            },
            {
                name: "F",
                triple: [18, 19],
                double: [18, 19],
                single: [20, 21, 22],
                none: []
            }
        ],
        checkMap: {
            node: "A",
            double: {
                node: "B",
                double: {
                    node: "C",
                    double: {
                        node: "D",
                        double: {
                            node: "E"
                        }
                    },
                    single: {
                        node: "D"
                    }
                }
            },
            single: {
                node: "F"
            }
        }
    }
]

function App() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [location, setLocation] = useState<(typeof locations)[number]>()
    const [steps, setSteps] = useState<Step[]>([])
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

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
                    style={{
                        width: 0.95 * windowSize.width,
                        height: 0.95 * windowSize.height,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    {currentStep && <h3>{`Check ${currentStep.node}`}</h3>}
                    <div style={{ height: "70%", overflow: "auto", visibility: "visible" }}>
                        <TransformWrapper initialScale={1.0} centerOnInit={true} limitToBounds={false} minScale={0.1}>
                            <TransformComponent>
                                <img
                                    src={location?.mapImage}
                                    alt="austic"
                                    // style={{ width: 0.7 * 0.9 * windowSize.width, height: 0.7 * 0.9 * windowSize.height }}
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                    <div style={{ display: "flex", height: "15%" }}>
                        {(["triple", "double", "single", "none"] as ScanResult[]).map((result) => (
                            <div key={result} className="nisbutton" onClick={() => setSteps([...steps, { node: currentStep.node, result }])}>
                                {result}
                            </div>
                        ))}
                    </div>
                    <h3 style={{ display: "flex", height: "15%", flexDirection: "column" }}>{possible.join(", ")}</h3>
                </div>
            )}
        </>
    )
}

if (window.alt1) {
    //tell alt1 about the app
    //this makes alt1 show the add app button when running inside the embedded browser
    //also updates app settings if they are changed
    alt1.identifyAppUrl("./appconfig.json")
}

export default App
