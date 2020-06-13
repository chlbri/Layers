import Domain from "../../domain/contract/Domain";

export default function useCaseHook<
  D extends Domain,
  K extends keyof D
>(domain: D, useCase: K): D[K]['call'] {
  return domain[useCase].call;
}
