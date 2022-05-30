
import backgroundImage from '../Assets/images/bannerImage1.jpg';


export default function Container(props) {

    const cssContainer = {
        backgroundColor: props.backgroundColor,
        display: props.display || 'flex',
        flexDirection: props.direction || 'row',
        justifyContent: props.justify || 'center',
        alignItems: props.align || 'center',
        textAlign: props.textAlign || 'center',
        flexWrap: props.wrap || 'no-wrap',
        width: props.width || '100%',
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        backgroundImage: `url(${props.backgroundImage})` || `url(${backgroundImage})`,
        opacity: props.opacity,
        height: props.height,
        width: props.width,
        marginTop: props.marginTop,
        marginRight: props.marginRight,
        marginLeft: props.marginLeft,
        marginBottom: props.marginBottom,
        gap: props.gap,


    }

    return <div style={cssContainer} >
        {props.children}
    </div >
}



