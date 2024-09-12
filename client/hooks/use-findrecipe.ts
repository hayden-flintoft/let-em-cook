// import SearchPage from '@/components/SearchPage'
// import { useQueryClient, useMutation } from '@tanstack/react-query'

// export default function useAddPet() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: PetData) => SearchPage(data),
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ['cook'] })
//     },
//   })
// }
