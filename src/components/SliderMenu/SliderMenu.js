import { useState, useEffect } from 'react';

import {
    SliderMenuContainer,
    SliderMenuHeader,
    SliderMenuProfileWrapper,
    SliderImage,
    SliderName,
    SliderOccupation,
    SliderDescription,
    SliderMenuLeftSlider,
    SliderMenuRightSlider,
    SliderMenuQuoteIcon,
    Wrapper
} from './SliderMenu.elements';

import allProfiles from '../../Data/people';

function SliderMenu(props) {
    const [profiles, setProfiles] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setProfiles(allProfiles)
    }, [])

    const handleClick = (action) => {
        const len = profiles.length

        if (action === 'previous') {
            if (currentIndex - 1 === -1) {
                setCurrentIndex(len - 1)
            } else {
                setCurrentIndex(currentIndex - 1)
            }
        }

        if (action === 'future') {
            if (currentIndex + 1 === len) {
                setCurrentIndex(0)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
        }
    }

    useEffect(() => {
        const myInterval = setInterval(() => {
            handleClick('future')
        }, 4000);

        return () => clearInterval(myInterval)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]
    )



    return (
        <>
            <SliderMenuContainer>
                <SliderMenuHeader><strong>/</strong> Reviews</SliderMenuHeader>
                <SliderMenuLeftSlider onClick={() => handleClick('previous')} />
                <Wrapper>
                    {profiles.map((person, index) => {
                        return (
                            <SliderMenuProfileWrapper className={(() => {
                                const len = profiles.length;

                                if (currentIndex === 0 && index === len - 1) {
                                    return 'previous'
                                } else if (currentIndex === len - 1 && index === 0) {
                                    return 'future'
                                } else if (index === currentIndex) {
                                    return 'current'
                                } else if (currentIndex > index) {
                                    return 'previous'
                                } else {
                                    return 'future'
                                }
                            })()
                            } key={person.id}>
                                <SliderImage src={person.image} />
                                <SliderName>{person.name}</SliderName>
                                <SliderOccupation>{person.title}</SliderOccupation>
                                <SliderDescription>{person.quote}</SliderDescription>
                            </SliderMenuProfileWrapper>
                        )
                    })}
                </Wrapper>
                <SliderMenuQuoteIcon />
                <SliderMenuRightSlider onClick={() => handleClick('future')} />
            </SliderMenuContainer>
        </>
    )
}

export default SliderMenu;