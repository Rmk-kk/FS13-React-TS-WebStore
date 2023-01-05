
interface ErrorImageComponentProps {
    path: string
}
const ErrorImageComponent = (props:ErrorImageComponentProps) => {
    const {path} = props;
    let width;
    (path === '404') ? width = 500 : width = 250;
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <img style={{maxWidth: `${width}px`}} src={`../img/${path}.png`} alt="error occurred"/>
        </div>
    )
}

export default ErrorImageComponent