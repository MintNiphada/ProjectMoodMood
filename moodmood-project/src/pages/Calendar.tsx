import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/react";

import { useState } from 'react';
import MoodCalendar from "../components/MoodCalendar";
import CalendarHeader from "../components/CalendarHeader";
import FeedCard from "../components/FeedCard";
import { MoodType, FeedEntry } from "../types/Mood";
import { useHistory } from 'react-router';

const Calendar: React.FC = () => {
const history = useHistory();

    // mock data
    const moodData: Record<string, MoodType[]> = {
        "2025-12-21": ["okay"],
        "2025-12-22": ["happy"],
        "2025-12-23": ["angry", "sad"],
        "2025-12-24": ["happy"],
        "2025-12-30": ["happy", "tired"],
    };

    const handleSelectDate = (date: string) => {
        console.log("เลือกวันที่:", date);
    };

    const [view, setView] = useState<'calendar' | 'timeline'>('calendar');

    const feedData: FeedEntry[] = [
        {
            id: '1',
            date: '22 ธันวาคม 2568',
            time: '18:05',
            moods: ['tired'],
            tags: ['เรียน'],
            note: 'รู้สึกเหนื่อยจากทั้งวัน แต่อย่างน้อยก็จัดการตัวเองได้',
            image: '/assets/poraloid.svg',
        },
        {
            id: '2',
            date: '21 ธันวาคม 2568',
            time: '12:05',
            moods: ['happy'],
            tags: [],
            note: 'ได้ออกไปข้างนอก เปลี่ยนบรรยากาศ รู้สึกดีขึ้น',
        },
    ];

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>MoodMood</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>


                {/* Calendar Header */}
                <CalendarHeader
                    monthLabel="ธันวาคม 2568"
                    streak={10}
                    view={view}
                    onToggleView={() =>
                        setView(v => (v === 'calendar' ? 'timeline' : 'calendar'))
                    }
                    onOpenMonthPicker={() => { }}
                />

                {/* Calendar */}
                {view === 'calendar' && (
                    <MoodCalendar
                        year={2025}
                        month={11}
                        data={moodData}
                        onSelectDate={(date) => console.log(date)}
                    />
                )}

                {/* Feed */}
                <div className="calendar-feed">
                    {feedData.map(entry => (
                        <FeedCard key={entry.id} entry={entry} />
                    ))}
                </div>

                <div className="floating-add-button">
                    <button
                        className="fab"
                        onClick={() => history.push('/add-mood')}
                    >
                        +
                    </button>
                </div>

            </IonContent>
        </IonPage>


    );
};

export default Calendar;
