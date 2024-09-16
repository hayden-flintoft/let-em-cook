// import { addPet } from '@/apis/pets'
// import { PetData } from '@models/pets'
// import { useQueryClient, useMutation } from '@tanstack/react-query'

// export default function useAddPet() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: PetData) => addPet(data),
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ['pet'] })
//     },
//   })
// }