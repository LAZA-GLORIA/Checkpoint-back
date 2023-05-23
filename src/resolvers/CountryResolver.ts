import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { getRepository } from "typeorm";

@Resolver()
export class CountryResolver {
  // Query qui renvoie la liste de tous les pays avec leurs attributs
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return getRepository(Country).find();
  }

  // Query qui prend en parametre le code du pays et renvoie le pays en question
  @Query(() => Country, { nullable: true })
  async countryByCode(@Arg("code") code: string): Promise<Country | null> {
    const country = await getRepository(Country)
      .createQueryBuilder("country")
      .where("country.code = :code", { code })
      .getOne();
    return country || null;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("nom") nom: string,
    @Arg("emoji") emoji: string,
    @Arg("codecontinent") codecontinent: string
  ): Promise<Country> {
    const country = getRepository(Country).create({
      code,
      nom,
      emoji,
      codecontinent,
    });
    await getRepository(Country).save(country);
    return country;
  }
}
