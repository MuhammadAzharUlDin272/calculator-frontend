import React from 'react';
import { text1, text2, text3, text4 } from '../assets';

const Data = () => {
    return (
        <div className='w-full flex max-md:flex-col justify-evenly gap-3'>
            <img src={text1} alt="text1" className='hidden lg:block absolute left-[160px] top-[400px]' />
            <img src={text2} alt="text2" className='hidden lg:block absolute right-[140px] top-[800px]' />
            <img src={text3} alt="text3" className='hidden lg:block absolute left-[130px] top-[1600px]' />
            <img src={text4} alt="text4" className='hidden lg:block absolute right-[150px] top-[2100px]' />
            <div className='grid grid-cols-12 gap-6'>
                <div className='border-dashed border md:col-span-6 col-span-12 border-black flex flex-col gap-5 items-center p-10 mb-4' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }} >
                    <h1 className='underline text-3xl font-semibold'>Do it yourself (DIY)</h1>
                    <p className='text-sm text-center'>Here's a simple tip that can make a big difference - disassemble and assemble the furniture yourself!.</p>
                    <p className='text-sm text-center'>Many moving companies charge an additional fee for transporting large and complex furniture, as this requires additional work time and skilled staff.</p>
                    <h2 className='underline text-xl font-semibold'>advantages</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'>Cost savings - disassembling and assembling furniture yourself can save you significantly in transportation costs. Many transport companies add between 100% - 150% more of the price of the item to the transport cost, for these services. Therefore, performing them independently can reduce the cost of the entire transition by dozens of percent.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'>More control - disassembling and assembling furniture yourself gives you more control over the moving process. You can choose when and how to disassemble and assemble the furniture, and make sure that this is done correctly and safely.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'>Transition survival - not all furniture is able to survive the transition safely. Dismantling and assembling furniture yourself can be an excellent opportunity to examine their condition before performing further actions, and save you heartache and even money.</p>
                    </div>
                    <h2 className='underline text-xl font-semibold mb-5'>this is how it is done!</h2>

                    <h3 className='text-xl font-semibold'>Looking for a friend who is handy</h3>
                    <p className='mb-5 text-center'>Ask friends or family for help Disassembling and assembling furniture can be easier with extra help.</p>

                    <h3 className='text-xl font-semibold'>Watching and learning</h3>
                    <p className='mb-5 text-center'>Watch Video Tutorials on the Internet There are many videos on the Internet showing how to disassemble and assemble different types of furniture.</p>

                    <h3 className='text-xl font-semibold'>Start small</h3>
                    <p className='mb-5 text-center'>Start with small pieces of furniture. Start with pieces of furniture that are smaller and easier to disassemble and assemble before moving on to larger and more complex pieces of furniture.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>
                    <h1 className='underline text-3xl font-semibold'>packaged like a pro</h1>
                    <p className='text-sm text-center'>Self-packing of furniture and boxes may sound like a difficult task, but it can be a fun and even rewarding activity!</p>
                    <h2 className='underline text-xl font-semibold'>Advantages</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'><span className='font-semibold'>significant savings</span> - self-packaging can <span className='font-bold'>save you 10%-15%</span > the shipping costs.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-semibold'>Order and organization</span> - The packing process allows you to organize your things efficiently, so that you know exactly where everything is in the new apartment.</p >
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-semibold'>A family experience </span>- Turning the packaging into a family project can be a formative and enjoyable activity for all members of the household.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>This is how you do it!</h2>

                    <h3 className='text-xl font-semibold'>Looking for a friend who is handy</h3>
                    <p className='mb-5 text-center'>Ask friends or family members for help Disassembling and assembling furniture can be easier with extra help.</p>

                    <h3 className='text-xl font-semibold'>Watchers and Learners</h3>
                    <p className='mb-5 text-center'>Watch video tutorials on the Internet There are many videos on the Internet showing how to disassemble and assemble different types of furniture.</p>

                    <h3 className='text-xl font-semibold'>Start small</h3>
                    <p className='mb-5 text-center mb-[135px]'>Start with small furniture Start with small furniture that is easier to disassemble and assemble before moving on to larger and more complex furniture.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10 mb-4' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>
                    <h1 className='underline text-3xl font-semibold'>Flexibility is key!</h1>
                    <p className='text-sm text-center'>
                        Many moving companies plan their schedule in advance, but you may
                        <br />
                        Last minute cancellations or changes. This is a great opportunity for you to save significantly on shipping costs!
                    </p>
                    <h2 className='underline text-xl font-semibold'>How does it work?!</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'>Filling holes in the schedule - Transportation companies prefer to fill holes in their schedule <span className='font-bold'>at a price as low as 20%</span> than to leave workers idle. Your transport, even at a discounted price, will help them use the work time of the transport team more effectively.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-bold'>Wage cost savings</span> - Transportation companies pay their workers by the hour. Canceling transport can lead to a situation where workers will be available without work. Your transport at a low price will allow the transport company to use the work time of the transport team and avoid paying unnecessary wages.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-bold'>Taking advantage of "low" days</span> - Many moving companies tend to be busy on Sundays, weekends and summer months. Ordering transport on "low" days such as weekdays or during transitional seasons can significantly reduce costs.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>This is how you do it!</h2>

                    <h3 className='text-xl font-semibold'>Flexibility, flexibility, and more flexibility</h3>
                    <p className='mb-5 text-center'>Be prepared to move the shipping date by a few days or during unpopular hours. Your availability will increase the chance of finding a discounted price.</p>

                    <h3 className='text-xl font-semibold'>Pre-order</h3>
                    <p className='mb-5 text-center'>The earlier you order the transport, the greater the chance of finding a convenient date at a discounted price.</p>

                    <h3 className='text-xl font-semibold'>bargaining</h3>
                    <p className='mb-5 text-center mb-[70px]'>Present your flexibility in dates and times as a bargaining chip in conversations with the moving company. Make it clear to the company that you are willing to move the transport in exchange for a discounted price.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10 ' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>

                    <h1 className='underline text-3xl font-semibold'>Join the journey</h1>
                    <p className='text-sm text-center'>Moving companies charge an extra fee for difficult moves, such as moving on high floors without an elevator, moving through narrow yards or moving that requires carrying items over a long distance.</p>
                    <h2 className='underline text-xl font-semibold'>How does it work?!</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'><span className='font-semibold'></span></p>
                        <p className='text-right'><span className='font-semibold'></span><span className='font-bold'></span></p>
                        <p className='text-right bg-red-400'><span className='font-semibold'>Discounting porter services</span> - Transport companies charge an additional fee for <span className='font-bold'> services 15% - increases the price of each item between 10%</span> bags. Each floor or complex access to a truck unloading items independently can save the need for porter services and thus lower the cost of transportation.</p>

                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-semibold'>Shortening the transport time: - </span>The less time the transport team spends carrying items, the shorter the transport time and the lower the price.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-semibold'>Reducing the need for cranes</span> - In some cases, moving companies are required to use cranes to raise or lower heavy items. Unloading items independently can save the need for cranes and thus lower the cost of transportation.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>This is how you do it!</h2>

                    <h3 className='text-xl font-semibold'>Planning ahead</h3>
                    <p className='mb-5 text-center'>Estimate which items you can unload independently and which items you will need help from the transport team.</p>

                    <h3 className='text-xl font-semibold'>Using aids</h3>
                    <p className='mb-5 text-center'>Use transport carts, wheels and manual cranes to make unloading the items easier.</p>

                    <h3 className='text-xl font-semibold'>Another tip</h3>
                    <p className='mb-5 text-center'>In the same way, you can also save money when unpacking the furniture in the new apartment. Uploading items independently can reduce the cost of transportation.</p>
                </div>


            </div>

            <div className='w-1/2 max-md:w-full flex flex-col items-center gap-5'>
                
            </div>
        </div>
    );
};

export default Data;