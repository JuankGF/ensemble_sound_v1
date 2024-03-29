import { type Equipment, type EquipmentType } from "@prisma/client";
import { toast } from "react-toastify";

import { api } from "~/utils/api";

export const useEquipmentByType = (type?: EquipmentType) => {
  const { data: techRider, isLoading } = api.equipments.getAll.useQuery(
    {
      type,
    },
    {
      onError: (error) => toast.error(error.message),
    }
  );
  const equipmentsByType = new Map<EquipmentType, Equipment[]>();
  techRider?.reduce((prev, equipment) => {
    const currentTypeEq = equipmentsByType.get(equipment.type);
    if (currentTypeEq) {
      currentTypeEq.push(equipment);
    } else prev.set(equipment.type, [equipment]);

    return equipmentsByType;
  }, equipmentsByType);

  return {
    equipmentsByType: Array.from(equipmentsByType.entries()).map(
      ([type, equipments]) => ({ type, equipments })
    ),
    isLoading,
  };
};
