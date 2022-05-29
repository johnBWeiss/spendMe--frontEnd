


export default function Container(props) {

    const cssContainer = {
        backgroundColor: props.backgroundColor || 'black',
        display: props.display || 'flex',
        flexDirection: props.direction || 'row',
        justifyContent: props.justify || 'center',
        alignItems: props.align || 'center',
        textAlign: props.textAlign || 'center',
        flexWrap: props.wrap || 'no-wrap',
        width: props.width || '100%',
        paddingTop: props.paddingTop || '0%',
        paddingBottom: props.paddingBottom || '0%',
        backgroundImage: `url(${props.backgroundImage})`,
        opacity: props.opacity,
        vh: props.vh,
        vw: props.vh,
        marginTop: props.marginTop || '3%',
        marginRight: props.marginRight || 'auto',
        marginLeft: props.marginLeft || 'auto',
        marginBottom: props.marginBottom || '3%',
        gap: props.gap || ' 30px 30px',


    }

    return <div style={cssContainer} >
        {props.children}
    </div >
}



