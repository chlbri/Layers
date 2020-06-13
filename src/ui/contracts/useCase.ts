import Domain from "./Domain";

export default function useCase<
  D extends Domain,
  K extends keyof D
>(domain: D, useCase: K): D[K]['call'] {
  return domain[useCase].call;
}
