import { Card } from 'antd';

const { Meta } = Card;

export default function Blogs() {
    const fileList = [

    ];
    return (
        <>
            <div class="py-8 flex flex-wrap md:flex-nowrap bg-slate-100 my-8">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col center">
                    <Card
                        hoverable
                        style={{ width: '10rem', height: '12rem' }}
                        cover={<img alt="example" src="https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4" />}
                    >
                        <Meta title="Username" />
                    </Card>
                </div>
                <div class="md:flex-grow">
                    <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">Bitters hashtag waistcoat fashion axe chia unicorn</h2>
                    <p class="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                    <a class="text-indigo-500 inline-flex items-center mt-4">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}