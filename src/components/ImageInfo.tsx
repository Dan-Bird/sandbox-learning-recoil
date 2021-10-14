import {Box, Text, VStack} from '@chakra-ui/layout'
import {Skeleton} from '@chakra-ui/skeleton'
import {selector, useRecoilValue} from 'recoil'
import {callApi} from '../Api'
import {selectedElementState} from '../Canvas'
import {elementState} from './Rectangle/Rectangle'

const imageIdState = selector({
  key: 'imageId',
  get: ({get}) => {
    const id = get(selectedElementState)
    if (id === null) return

    const element = get(elementState(id))
    return element.image?.id
  },
})

const imageInfoState = selector({
  key: 'imageInfo',
  get: ({get}) => {
    const imageId = get(imageIdState)
    if (imageId === undefined) return

    return callApi('image-details', {queryParams: {seed: imageId}})
  },
})

export const ImageInfo = () => {
  const imageInfo = useRecoilValue(imageInfoState)
  console.log({imageInfo})
  return (
    <VStack spacing={2} alignItems="flex-start" width="100%">
      <Info label="Author" value={imageInfo.author} />
      <Info label="Image URL" value={imageInfo.url} />
    </VStack>
  )
}

export const ImageInfoFallback = () => {
  return (
    <VStack spacing={2} alignItems="flex-start" width="100%">
      <Info label="Author" />
      <Info label="Image URL" />
    </VStack>
  )
}

export const Info = ({label, value}: {label: string; value?: string}) => {
  return (
    <Box width="175px">
      <Text fontSize="14px" fontWeight="500" mb="2px">
        {label}
      </Text>
      {value === undefined ? (
        <Skeleton width="100%" height="21px" />
      ) : (
        <Text fontSize="14px">{value}</Text>
      )}
    </Box>
  )
}
