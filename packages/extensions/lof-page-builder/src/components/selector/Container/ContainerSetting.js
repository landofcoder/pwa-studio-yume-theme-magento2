import React from 'react';
import { useNode } from "@craftjs/core";


export const ContainerSettings = () => {
    const {
        flexDirection,
        alignItems,
        justifyContent,
        fillSpace,
        padding,
        margin,
        background,
        color,
        shadow,
        radius,
        width,
        height,
        actions: { setProp }
    } = useNode((node) => ({
        flexDirection: node.data.props.flexDirection,
        alignItems: node.data.props.alignItems,
        justifyContent: node.data.props.justifyContent,
        fillSpace: node.data.props.fillSpace,
        padding: node.data.props.padding,
        margin: node.data.props.margin,
        background: node.data.props.background,
        color: node.data.props.color,
        shadow: node.data.props.shadow,
        radius: node.data.props.radius,
        width: node.data.props.width,
        height: node.data.props.height
    }));
    return (
        <>
            Containter setting
        </>
    )
}
