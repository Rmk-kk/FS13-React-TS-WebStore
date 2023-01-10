interface ErrorImageComponentProps {
    image: string,
    type: string
}
const ErrorImageComponent = (props:ErrorImageComponentProps) => {
    const {image, type} = props;
    let width;
    (type === '404') ? width = 500 : width = 250;
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <img style={{maxWidth: `${width}px`}} src={image} alt="error occurred"/>
        </div>
    )
}

export default ErrorImageComponent