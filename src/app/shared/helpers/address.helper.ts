import { IAddress } from '../models/address.interface';

export function areAddressesEqual(
  legalAddress: IAddress,
  actualAddress: IAddress | null
): boolean {
  if (!actualAddress) {
    return false;
  }
  if (
    legalAddress.country !== actualAddress.country ||
    legalAddress.countryEng !== actualAddress.countryEng ||
    legalAddress.full !== actualAddress.full ||
    legalAddress.fullEng !== actualAddress.fullEng
  ) {
    return false;
  }
  return true;
}
