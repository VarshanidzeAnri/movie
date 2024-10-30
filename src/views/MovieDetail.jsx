
import VideoPlayer from '../components/VideoPlayer';

function MovieDetail() {
    return (
        <div className="w-[90%] lg:w-[70vw] mx-auto flex flex-col gap-5 mb-10">

                <div className="w-full flex justify-start gap-3 mt-5 lg:mt-0">
                    <div className="hidden lg:block h-[50vh] w-[30%]"><img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className=" h-full object-cover rounded-md" /></div>
                    {/* <div className="h-[30vh] md:h-[50vh] w-full lg:w-[70%]"><img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className="w-full h-full object-cover rounded-md" /></div> */}
                    
                    <div className="h-[30vh] md:h-[50vh] w-full lg:w-[70%]">
                        <VideoPlayer className='w-full h-full object-cover rounded-md' />
                    </div>
                    
                </div>

                <div className="flex flex-col gap-2 md:gap-3 p-5 pt-2 bg-zinc-800 w-full rounded-md mt-60">
                        <div>
                            <div className="text-2xl mt-2">ლურჯი საკეტი</div>
                            <div className="text-xl mt-2">Bluelock</div>
                        </div>
                        <div className="md:hidden w-full h-32"><img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className=" h-full object-cover rounded-md" /></div>
                        <div className="flex justify-start gap-2 mt-1">

                            <div className="hidden md:block lg:hidden w-full"><img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" className=" h-full object-cover rounded-md" /></div>
                            
                            <div className="flex flex-col justify-start gap-3 text-sm">
                                <div>წელი: 2024</div>
                                <div>ჟანრი: დრამა, კომედია, სათავგადასავლო</div>
                                <div>რეჟისორი: ანრი ვარშანიძე, რეზი ბოლქვაძე</div>
                                <div>მსახიობები: ანრი ვარშანიძე, რეზი ბოლქვაძე</div>
                            </div>
                        </div>
                        
                        <div className="w-full text-wrap text-sm flex flex-col gap-2 ">
                            <div>მოკლე აღწერა:</div>
                            <div>იაპონიის საფეხბურთო ნაკრები მსოფლიო ჩემპიონატზე დამარცხდა, რაც ამ სპორტული მოედნის სახელმწიფო დონეზე ანალიზის საფუძველი გახდა. განცდილი ზარალი, გარკვეულწილად, ქვეყნის რეპუტაციის დარტყმა იყო. მოქმედება იყო საჭირო. ამიტომაც წამოიწყო პროექტი Blue Lock. ამ პროექტის ხელმძღვანელობა ჯინპაჩი ეგოს დაევალა. ამ ადამიანზეა დამოკიდებული, შეძლებს თუ არა საფეხბურთო ნაკრები მომავალ ჩემპიონატზე გამარჯვებას. პროექტის ფარგლებში აუცილებელია იდეალური თავდამსხმელის შექმნა და დამუშავება, რათა ის იყოს ნამდვილი პროფესიონალი და წარმოუდგენლად დარწმუნებული თავის შესაძლებლობებში.</div>
                        </div>
                        

                    </div>
        </div>
    )
}

export default MovieDetail
