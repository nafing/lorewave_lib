import { useCallback, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import styles from './index.module.css'
import { className, extractStyleProps, omitStyleProps, toRem } from '../../utils'
import type { StyleProps } from '../../utils'

type Axis = 'x' | 'y'

type ScrollMetrics = {
  clientHeight: number
  clientWidth: number
  overflowX: boolean
  overflowY: boolean
  scrollHeight: number
  scrollLeft: number
  scrollTop: number
  scrollWidth: number
}

type DragState = {
  axis: Axis
  startPointer: number
  startScroll: number
}

const MIN_THUMB_SIZE = 20

export type ScrollAreaProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> &
  StyleProps & {
    children?: ReactNode
    h?: CSSProperties['height']
    height?: CSSProperties['height']
    mah?: CSSProperties['maxHeight']
    maxHeight?: CSSProperties['maxHeight']
    mih?: CSSProperties['minHeight']
    minHeight?: CSSProperties['minHeight']
    scrollOffset?: boolean
    scrollbarSize?: number | string
    style?: CSSProperties
    viewportClassName?: string
    viewportStyle?: CSSProperties
  }

const createEmptyMetrics = (): ScrollMetrics => ({
  clientHeight: 0,
  clientWidth: 0,
  overflowX: false,
  overflowY: false,
  scrollHeight: 0,
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
})

const resolveScrollbarSize = (value: number | string) => {
  return typeof value === 'number' ? toRem(value) : value
}

const resolveScrollbarSizeNumber = (value: number | string) => {
  if (typeof value === 'number') {
    return value
  }

  const trimmedValue = value.trim()

  if (trimmedValue.endsWith('rem')) {
    return Number.parseFloat(trimmedValue) * 16
  }

  if (trimmedValue.endsWith('px')) {
    return Number.parseFloat(trimmedValue)
  }

  const parsedNumber = Number.parseFloat(trimmedValue)

  return Number.isFinite(parsedNumber) ? parsedNumber : 12
}

const getScrollMetrics = (viewport: HTMLDivElement): ScrollMetrics => ({
  clientHeight: viewport.clientHeight,
  clientWidth: viewport.clientWidth,
  overflowX: viewport.scrollWidth > viewport.clientWidth + 1,
  overflowY: viewport.scrollHeight > viewport.clientHeight + 1,
  scrollHeight: viewport.scrollHeight,
  scrollLeft: viewport.scrollLeft,
  scrollTop: viewport.scrollTop,
  scrollWidth: viewport.scrollWidth,
})

export const ScrollArea = ({
  children,
  className: customClassName,
  h,
  height,
  mah,
  maxHeight,
  mih,
  minHeight,
  scrollOffset = false,
  scrollbarSize = 12,
  style,
  viewportClassName,
  viewportStyle,
  ...props
}: ScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const [metrics, setMetrics] = useState<ScrollMetrics>(createEmptyMetrics)
  const layoutStyles = extractStyleProps(props)
  const htmlProps = omitStyleProps(props)
  const { tabIndex, ...rootProps } = htmlProps
  const resolvedScrollbarSize = resolveScrollbarSize(scrollbarSize)
  const resolvedScrollbarSizeNumber = resolveScrollbarSizeNumber(scrollbarSize)
  const resolvedHeight = height ?? h
  const resolvedMaxHeight = maxHeight ?? mah
  const resolvedMinHeight = minHeight ?? mih

  useEffect(() => {
    const viewport = viewportRef.current
    const content = contentRef.current

    if (!viewport || !content) {
      return undefined
    }

    let frameId = 0

    const updateMetrics = () => {
      frameId = 0
      const nextMetrics = getScrollMetrics(viewport)

      setMetrics((current) => {
        if (
          current.clientHeight === nextMetrics.clientHeight &&
          current.clientWidth === nextMetrics.clientWidth &&
          current.overflowX === nextMetrics.overflowX &&
          current.overflowY === nextMetrics.overflowY &&
          current.scrollHeight === nextMetrics.scrollHeight &&
          current.scrollLeft === nextMetrics.scrollLeft &&
          current.scrollTop === nextMetrics.scrollTop &&
          current.scrollWidth === nextMetrics.scrollWidth
        ) {
          return current
        }

        return nextMetrics
      })
    }

    const scheduleUpdate = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(updateMetrics)
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : null

    resizeObserver?.observe(viewport)
    resizeObserver?.observe(content)
    viewport.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    scheduleUpdate()

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      viewport.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      resizeObserver?.disconnect()
    }
  }, [children, resolvedHeight, resolvedMaxHeight, resolvedMinHeight, resolvedScrollbarSize])

  const maxScrollTop = Math.max(metrics.scrollHeight - metrics.clientHeight, 0)
  const maxScrollLeft = Math.max(metrics.scrollWidth - metrics.clientWidth, 0)
  const verticalTrackSize = Math.max(metrics.clientHeight - (metrics.overflowX ? resolvedScrollbarSizeNumber : 0), 0)
  const horizontalTrackSize = Math.max(metrics.clientWidth - (metrics.overflowY ? resolvedScrollbarSizeNumber : 0), 0)
  const verticalThumbSize = metrics.overflowY
    ? Math.max((metrics.clientHeight / Math.max(metrics.scrollHeight, 1)) * verticalTrackSize, MIN_THUMB_SIZE)
    : 0
  const horizontalThumbSize = metrics.overflowX
    ? Math.max((metrics.clientWidth / Math.max(metrics.scrollWidth, 1)) * horizontalTrackSize, MIN_THUMB_SIZE)
    : 0
  const verticalThumbOffset = maxScrollTop > 0
    ? (metrics.scrollTop / maxScrollTop) * Math.max(verticalTrackSize - verticalThumbSize, 0)
    : 0
  const horizontalThumbOffset = maxScrollLeft > 0
    ? (metrics.scrollLeft / maxScrollLeft) * Math.max(horizontalTrackSize - horizontalThumbSize, 0)
    : 0

  const handleWindowMouseMove = useCallback((event: MouseEvent) => {
    const viewport = viewportRef.current
    const dragState = dragStateRef.current

    if (!viewport || !dragState) {
      return
    }

    if (dragState.axis === 'y') {
      const pointerDelta = event.clientY - dragState.startPointer
      const trackTravel = Math.max(verticalTrackSize - verticalThumbSize, 1)
      const scrollDelta = (pointerDelta / trackTravel) * maxScrollTop

      viewport.scrollTop = dragState.startScroll + scrollDelta
      return
    }

    const pointerDelta = event.clientX - dragState.startPointer
    const trackTravel = Math.max(horizontalTrackSize - horizontalThumbSize, 1)
    const scrollDelta = (pointerDelta / trackTravel) * maxScrollLeft

    viewport.scrollLeft = dragState.startScroll + scrollDelta
  }, [horizontalThumbSize, horizontalTrackSize, maxScrollLeft, maxScrollTop, verticalThumbSize, verticalTrackSize])

  const handleWindowMouseUp = useCallback(() => {
    dragStateRef.current = null
    window.removeEventListener('mousemove', handleWindowMouseMove)
    window.removeEventListener('mouseup', handleWindowMouseUp)
  }, [handleWindowMouseMove])

  const handleThumbMouseDown = (axis: Axis) => (event: ReactMouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    dragStateRef.current = {
      axis,
      startPointer: axis === 'y' ? event.clientY : event.clientX,
      startScroll: axis === 'y' ? viewport.scrollTop : viewport.scrollLeft,
    }

    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)
  }

  const handleTrackMouseDown = (axis: Axis) => (event: ReactMouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current

    if (!viewport || event.target !== event.currentTarget) {
      return
    }

    const trackRect = event.currentTarget.getBoundingClientRect()

    if (axis === 'y') {
      const clickOffset = event.clientY - trackRect.top - verticalThumbSize / 2
      const nextScroll = (clickOffset / Math.max(verticalTrackSize - verticalThumbSize, 1)) * maxScrollTop

      viewport.scrollTop = nextScroll
      return
    }

    const clickOffset = event.clientX - trackRect.left - horizontalThumbSize / 2
    const nextScroll = (clickOffset / Math.max(horizontalTrackSize - horizontalThumbSize, 1)) * maxScrollLeft

    viewport.scrollLeft = nextScroll
  }

  useEffect(() => {
    return () => {
      dragStateRef.current = null
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('mouseup', handleWindowMouseUp)
    }
  }, [handleWindowMouseMove, handleWindowMouseUp])

  const viewportInlineStyle = {
    ...viewportStyle,
    '--lw-scrollarea-offset-x': scrollOffset && metrics.overflowY ? resolvedScrollbarSize : '0',
    '--lw-scrollarea-offset-y': scrollOffset && metrics.overflowX ? resolvedScrollbarSize : '0',
    '--lw-scrollarea-size': resolvedScrollbarSize,
    height: resolvedHeight,
    maxHeight: resolvedMaxHeight,
    minHeight: resolvedMinHeight,
  } as CSSProperties

  return (
    <div
      {...rootProps}
      className={className(styles.root, customClassName)}
      style={{
        ...layoutStyles,
        ...style,
      } as CSSProperties}
    >
      <div
        className={className(styles.viewport, viewportClassName)}
        ref={viewportRef}
        style={viewportInlineStyle}
        tabIndex={tabIndex ?? (metrics.overflowX || metrics.overflowY ? 0 : undefined)}
      >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </div>
      {metrics.overflowY && (
        <div className={className(styles.scrollbar, styles.vertical)} onMouseDown={handleTrackMouseDown('y')}>
          <div
            className={styles.thumb}
            onMouseDown={handleThumbMouseDown('y')}
            style={{ height: toRem(verticalThumbSize), transform: `translateY(${toRem(verticalThumbOffset)})` }}
          />
        </div>
      )}
      {metrics.overflowX && (
        <div className={className(styles.scrollbar, styles.horizontal)} onMouseDown={handleTrackMouseDown('x')}>
          <div
            className={styles.thumb}
            onMouseDown={handleThumbMouseDown('x')}
            style={{ transform: `translateX(${toRem(horizontalThumbOffset)})`, width: toRem(horizontalThumbSize) }}
          />
        </div>
      )}
    </div>
  )
}