import {
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from '@chakra-ui/react'
import {selector, useRecoilState} from 'recoil'
import {selectedElementState} from './Canvas'
import {Element, elementState} from './components/Rectangle/Rectangle'

const selectedElementProperties = selector<Element | undefined>({
  key: 'selectedElementProperties',
  get: ({get}) => {
    const selectedElementId = get(selectedElementState)
    if (selectedElementId === null) return

    return get(elementState(selectedElementId))
  },
  set: ({get, set}, newElement) => {
    const selectedElementId = get(selectedElementState)
    if (selectedElementId === null || !newElement) return

    set(elementState(selectedElementId), newElement)
  },
})

export const EditProperties = () => {
  const [element, setElement] = useRecoilState(selectedElementProperties)
  if (!element) return null

  console.log(element)

  const topValue = element.style.position.top
  const leftValue = element.style.position.left
  const widthValue = element.style.size.width
  const heightValue = element.style.size.height

  const setPosition = (property: 'top' | 'left', value: number) => {
    setElement({
      ...element,
      style: {
        ...element.style,
        position: {
          ...element.style.position,
          [property]: value,
        },
      },
    })
  }

  const setSize = (property: 'width' | 'height', value: number) => {
    setElement({
      ...element,
      style: {
        ...element.style,
        size: {
          ...element.style.size,
          [property]: value,
        },
      },
    })
  }

  return (
    <Card>
      <Section heading="Position">
        <Property
          label="Top"
          value={topValue}
          onChange={(top) => setPosition('top', top)}
        />
        <Property
          label="Left"
          value={leftValue}
          onChange={(left) => setPosition('left', left)}
        />
      </Section>
      <Section heading="Size">
        <Property
          label="Width"
          value={widthValue}
          onChange={(width) => setSize('width', width)}
        />
        <Property
          label="Height"
          value={heightValue}
          onChange={(height) => setSize('height', height)}
        />
      </Section>
    </Card>
  )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
  return (
    <VStack spacing={2} align="flex-start">
      <Text fontWeight="500">{heading}</Text>
      {children}
    </VStack>
  )
}

const Property = ({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) => {
  return (
    <div>
      <Text fontSize="14px" fontWeight="500" mb="2px">
        {label}
      </Text>
      <InputGroup size="sm" variant="filled">
        <NumberInput value={value} onChange={(_, value) => onChange(value)}>
          <NumberInputField borderRadius="md" />
          <InputRightElement
            pointerEvents="none"
            children="px"
            lineHeight="1"
            fontSize="12px"
          />
        </NumberInput>
      </InputGroup>
    </div>
  )
}

const Card: React.FC = ({children}) => (
  <VStack
    position="absolute"
    top="20px"
    right="20px"
    backgroundColor="white"
    padding={2}
    boxShadow="md"
    borderRadius="md"
    spacing={3}
    align="flex-start"
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </VStack>
)
