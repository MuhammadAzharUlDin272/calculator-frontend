import { useSelector } from 'react-redux';

const Table = () => {
  const items = useSelector(state => state.items.items)
  const packagedItems = useSelector(state => state.items.packagedItems)
  const assembledItems = useSelector(state => state.items.assembledItems)
  const disassembledItems = useSelector(state => state.items.disassembledItems)
  const craneItems = useSelector(state => state.items.craneItems)
  const baseline = useSelector(state => state.items.baseline)


  const getTotalCost = (item) => {
    let totalCost = 0;
    if(packagedItems.some(packagedItem => packagedItem.name === item.name))
    {
      totalCost += item.price * 1.1
    }
    if(disassembledItems.some(disassembledItem => disassembledItem.name === item.name))
    {
      totalCost += item.price
    }
    if(assembledItems.some(assembledItem => assembledItem.name === item.name))
    {
      totalCost += item.price
    }
    if(craneItems.some(craneItem => craneItem.name === item.name)) {
      totalCost += craneItems.find(craneItem => craneItem.name === item.name).price;
    }

    // Added data from file_context_0
    totalCost += (baseline.originfloor ? (item.price * baseline.originfloor * 0.1) : 0) +
                  (baseline.destinationfloor ? (item.price * baseline.destinationfloor * 0.1) : 0);

    return totalCost;
  };

  return (
    <div className="hidden lg:block w-full">
      <div className="w-full grid grid-cols-9 bg-gray-100 rounded-t-md p-2">
        <div className='w-full flex flex-col items-center justify-center'>Total costs</div>
        <div className="col-span-6">
          <h2 className='w-full flex flex-col items-center'>Extras</h2>
          <div className='grid grid-cols-6'>
            <p className='flex flex-col items-center'>Storage</p>
            <p className='flex flex-col items-center'>Packaging</p>
            <p className='flex flex-col items-center'>Assembly</p>
            <p className='flex flex-col items-center'>Accessibility</p>
            <p className='flex flex-col items-center'> Floor</p>
            <p className='flex flex-col items-center'>Amount of items</p>
          </div>
        </div>
        <div className='w-full flex flex-col items-center justify-center'>Base price</div>
        <div className='w-full flex flex-col items-center justify-center'>Description</div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="w-full grid grid-cols-10 bg-transparent p-2 border-[1px] border-gray-500">
          <div className='flex flex-col items-center'>{getTotalCost(item)}</div>
          <div className="col-span-7 grid grid-cols-6">
            <div className='flex flex-col items-center'>{craneItems.find(craneItem => craneItem.name === item.name)?.price || 0}</div>
            <div className='flex flex-col items-center'>{packagedItems.some(packagedItem => packagedItem.name === item.name) ? item.price * 1.1 : 0}</div>
            <div className='flex flex-col items-center'>
              {disassembledItems.some(disassembledItem => disassembledItem.name === item.name) ? item.disassembly_costs : 0}
            </div>
            <div className='flex flex-col items-center'>
              {assembledItems.some(assembledItem => assembledItem.name === item.name) ? item.disassembly_costs : 0}
            </div>
            <div className='flex flex-col items-center'>
              {(baseline.origintruckAccess === 'medium' ? (item.price * 0.1) :
                baseline.origintruckAccess === 'hard' ? (item.price * 0.2) : 0) +
              (baseline.destinationtruckAccess === 'medium' ? (item.price * 0.1) :
                baseline.destinationtruckAccess === 'hard' ? (item.price * 0.2) : 0)}
            </div>
            <div className='flex flex-col items-center'>
              {(baseline.originfloor ? (item.price * baseline.originfloor * 0.1) : 0) +
              (baseline.destinationfloor ? (item.price * baseline.destinationfloor * 0.1) : 0)}
            </div>
          </div>
          <div className='flex flex-col items-center'>{item.quantity}</div>
          <div className=''>{item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Table;
