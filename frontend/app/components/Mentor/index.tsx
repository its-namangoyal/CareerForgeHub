"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    name: string;
    imgSrc: string;
    link: string;
}

const postData: DataType[] = [
    {
        name: 'Dhruvi Kunvarani',
        imgSrc: '/assets/mentor/dhruvi.jpeg',
        link: 'https://www.linkedin.com/in/dhruvi-kunvarani-31b550197/',
    },
    {
        name: 'Naman Goyal',
        imgSrc: '/assets/mentor/naman.jpeg',
        link: 'https://www.linkedin.com/in/-naman-goyal/',
    },
    {
        name: 'Mahir Patel',
        imgSrc: '/assets/mentor/mahir.jpeg',
        link: 'https://www.linkedin.com/in/mahirpatel08/',
    },
    {
        name: 'Sidh Patel',
        imgSrc: '/assets/mentor/siddh.jpeg',
        link: 'https://www.linkedin.com/in/siddh-patel-60b5591a9/',
    },
]

// CAROUSEL SETTINGS

function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", position: 'absolute', alignItems: "center", background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center", background: "#D5EFFA", padding: "28px", borderRadius: "30px", border: "1px solid #1A21BC" }}
            onClick={onClick}
        />
    );
}



export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
            // centerMode: true,
            // slidesToScroll: 1,
            // arrows: false,
            // autoplay: false,
            // speed: 4000,
            // nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
            // prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
            autoplaySpeed: 4500,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 530,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 230,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };


        return (
            <div className="py-10 sm:py-24 bg-paleblue" id="mentor">

                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8 relative'>
                    <h2 className="lh-82 text-midnightblue text-4xl md:text-55xl text-center md:text-start font-semibold">Meet Our Team!</h2>

                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className='m-3 py-14 md:my-10 text-center'>
                                    <div className="relative">
                                        <div className="relative">
                                            <div className="absolute right-[20px] bottom-[10px] bg-white rounded-full p-4">
                                                <a href={items.link} target="_blank" rel="noopener noreferrer">
                                                    <Image src={'/assets/mentor/linkedin.svg'} alt="linkedin-image" width={25} height={24} />
                                                </a>
                                            </div>

                                            <Image src={items.imgSrc} alt="user-image" width={306} height={306} className="inline-block m-auto rounded-full" />
                                        </div>

                                    </div>
                                    <div className="mt-5">
                                        <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                </div>
            </div>

        );
    }
}
