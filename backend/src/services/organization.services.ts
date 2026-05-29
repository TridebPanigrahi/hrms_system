import { AppDataSource } from "../config/data-source";
import { Organization } from "../entities/Organization";

const organizationRepository = AppDataSource.getRepository(Organization);

export const createOrganization = async (name: string) => {
  const organization = organizationRepository.create({ name });
  await organizationRepository.save(organization);
  return organization;
};

export const getOrganization = async () => {
  const organization = organizationRepository.find();
  return organization;
};
