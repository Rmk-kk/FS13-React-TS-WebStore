
interface ErrorImageComponentProps {
    path: string
}
const ErrorImageComponent = (props:ErrorImageComponentProps) => {
    const {path} = props;
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <img src={`../img/categories/${path}.png`} alt="no product found"/>
        </div>
    )
}

export default ErrorImageComponent