import {useEffect, useState} from "react";
import LoadingScreen from "./LoadingScreen";
import IDS from '../algorithms/IDS'
import AStarRunner from '../algorithms/AStar'
import GreedyBFS from '../algorithms/GreedyBFS'
import Result from "./Result";

const Solver = ({ blocks, algorithm }) => {
    const [result, setResult] = useState(false)
    const [execTime, setExecTime] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            let startDate = new Date();

            if (algorithm === "IDS") {
                let res = IDS({
                    state: blocks,
                    depth: 1
                })

                let endDate = new Date();
                let timeTaken = endDate.getTime() - startDate.getTime();
                setExecTime(timeTaken)

                setResult(res)
            }
            else if (algorithm === "AStar") {
                let res = AStarRunner({
                    state: blocks,
                    parent: null,
                    depth: 1,
                    f: null
                })

                let endDate = new Date();
                let timeTaken = endDate.getTime() - startDate.getTime();
                setExecTime(timeTaken)

                setResult(res)
            }
            else {
                let res = GreedyBFS({
                    state: blocks,
                    parent: null,
                    depth: 1,
                    f: null
                })

                let endDate = new Date();
                let timeTaken = endDate.getTime() - startDate.getTime();
                setExecTime(timeTaken)

                setResult(res)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [algorithm, blocks]);

    return(
        <div>
            {
                result === false ?
                    <div>
                        <LoadingScreen/>
                    </div>
                    :
                    <Result result={result} execTime={execTime} algorithm={algorithm}/>
            }
        </div>
    )
}

export default Solver