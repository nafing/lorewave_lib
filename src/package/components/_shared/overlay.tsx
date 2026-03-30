import { useEffect, useLayoutEffect, useMemo, useState, type CSSProperties, type RefObject } from 'react'

export type OverlayPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'

export type OverlayAnimationName = 'animateFromTop' | 'animateFromRight' | 'animateFromBottom' | 'animateFromLeft'

type VirtualPoint = {
  x: number
  y: number
}

type RectLike = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

type UseOverlayPositionOptions = {
  anchorPoint?: VirtualPoint | null
  offset?: number
  open: boolean
  overlayRef: RefObject<HTMLElement | null>
  padding?: number
  position?: OverlayPosition
  targetRef?: RefObject<HTMLElement | null>
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const getVirtualRect = (point: VirtualPoint): RectLike => ({
  bottom: point.y,
  height: 0,
  left: point.x,
  right: point.x,
  top: point.y,
  width: 0,
})

export const getOverlayAnimationName = (position: OverlayPosition): OverlayAnimationName => {
  switch (position) {
    case 'top':
    case 'top-start':
    case 'top-end':
      return 'animateFromBottom'
    case 'right':
      return 'animateFromLeft'
    case 'left':
      return 'animateFromRight'
    case 'bottom':
    case 'bottom-end':
    case 'bottom-start':
    default:
      return 'animateFromTop'
  }
}

const clamp = (value: number, min: number, max: number) => {
  if (min > max) {
    return min
  }

  return Math.min(Math.max(value, min), max)
}

const getOverlayCoordinates = (
  anchorRect: RectLike,
  overlayRect: DOMRect,
  position: OverlayPosition,
  offset: number,
  padding: number,
) => {
  let top = 0
  let left = 0

  switch (position) {
    case 'top':
      top = anchorRect.top - overlayRect.height - offset
      left = anchorRect.left + anchorRect.width / 2 - overlayRect.width / 2
      break
    case 'top-start':
      top = anchorRect.top - overlayRect.height - offset
      left = anchorRect.left
      break
    case 'top-end':
      top = anchorRect.top - overlayRect.height - offset
      left = anchorRect.right - overlayRect.width
      break
    case 'right':
      top = anchorRect.top + anchorRect.height / 2 - overlayRect.height / 2
      left = anchorRect.right + offset
      break
    case 'left':
      top = anchorRect.top + anchorRect.height / 2 - overlayRect.height / 2
      left = anchorRect.left - overlayRect.width - offset
      break
    case 'bottom':
      top = anchorRect.bottom + offset
      left = anchorRect.left + anchorRect.width / 2 - overlayRect.width / 2
      break
    case 'bottom-end':
      top = anchorRect.bottom + offset
      left = anchorRect.right - overlayRect.width
      break
    case 'bottom-start':
    default:
      top = anchorRect.bottom + offset
      left = anchorRect.left
      break
  }

  return {
    left: clamp(left, padding, window.innerWidth - overlayRect.width - padding),
    top: clamp(top, padding, window.innerHeight - overlayRect.height - padding),
  }
}

export const useDismissableLayer = (
  refs: Array<RefObject<HTMLElement | null>>,
  onDismiss: () => void,
  enabled: boolean,
  options?: { dismissOnEscape?: boolean; dismissOnPointerDownOutside?: boolean; ignoreSelector?: string },
) => {
  const refList = useMemo(() => refs, [refs])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (options?.dismissOnPointerDownOutside === false) {
        return
      }

      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (options?.ignoreSelector && target instanceof Element && target.closest(options.ignoreSelector)) {
        return
      }

      if (refList.some((ref) => ref.current?.contains(target))) {
        return
      }

      onDismiss()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (options?.dismissOnEscape === false) {
        return
      }

      if (event.key === 'Escape') {
        onDismiss()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, onDismiss, options?.ignoreSelector, refList])
}

export const useOverlayPosition = ({
  anchorPoint,
  offset = 8,
  open,
  overlayRef,
  padding = 8,
  position = 'bottom-start',
  targetRef,
}: UseOverlayPositionOptions) => {
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0, pointerEvents: 'none', position: 'fixed' })

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setStyle({ opacity: 0, pointerEvents: 'none', position: 'fixed' })
      return undefined
    }

    const updatePosition = () => {
      const overlayElement = overlayRef.current
      const anchorRect = anchorPoint
        ? getVirtualRect(anchorPoint)
        : targetRef?.current?.getBoundingClientRect()

      if (!overlayElement || !anchorRect) {
        return
      }

      const overlayRect = overlayElement.getBoundingClientRect()
      const coordinates = getOverlayCoordinates(anchorRect, overlayRect, position, offset, padding)

      setStyle({
        left: coordinates.left,
        position: 'fixed',
        top: coordinates.top,
        zIndex: 1200,
      })
    }

    const frame = window.requestAnimationFrame(updatePosition)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorPoint, offset, open, overlayRef, padding, position, targetRef])

  return style
}