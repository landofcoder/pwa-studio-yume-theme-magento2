import React, { useEffect, useRef, useCallback } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { ROOT_NODE } from '@craftjs/utils';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { ArrowUp, Move, Trash } from 'react-feather';
import classes from './view.css';

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

export const RenderNode = ({ render }) => {
  const { actions, query, connectors } = useEditor();
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add(classes.componentSelected);
      else dom.classList.remove(classes.componentSelected);
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  useEffect(() => {
    if (document.querySelector('.craftjs-renderer')) {
      document
        .querySelector('.craftjs-renderer')
        .addEventListener('scroll', scroll);
    }

    return () => {
      if (document.querySelector('.craftjs-renderer')) {
        document
          .querySelector('.craftjs-renderer')
          .removeEventListener('scroll', scroll);
      }

    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
          <IndicatorDiv
            ref={currentRef}
            className={classes.tooltip}
            style={{
              left: getPos(dom).left,
              top: getPos(dom).top,
              zIndex: 9999,
            }}
          >
            <h2 className={classes.tooltipHeader}>{name}</h2>
            {moveable ? (
              <Btn className={classes.tooltipIcon} ref={drag}>
                <Move />
              </Btn>
            ) : null}
            {id !== ROOT_NODE && (
              <Btn
                className={classes.tooltipIcon}
                onClick={() => {
                  actions.selectNode(parent);
                }}
              >
                <ArrowUp />
              </Btn>
            )}
            {deletable ? (
              <Btn
                className={classes.tooltipIcon}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  actions.delete(id);
                }}
              >
                <Trash/>
              </Btn>
            ) : null}
          </IndicatorDiv>,
          document.body
        )
        : null}
      {render}
    </>
  );
};
