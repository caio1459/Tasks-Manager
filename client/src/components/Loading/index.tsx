
import { LoadingStyle } from "./style";

interface LoadingProps {
    visible?: boolean;
}


export const Loading = ({ visible = false }: LoadingProps) => {
    return (
        <>
            {
                visible &&
                <LoadingStyle />
            }
        </>
    )
}
