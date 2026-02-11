import Header from "@/components/Header";
import LottoBall from "@/components/LottoBall";

export default function AboutPage() {
  return (
    <>
      <Header title="서비스 소개" showBack />
      <main className="px-4 py-5 space-y-8">
        {/* Hero */}
        <div className="text-center py-6">
          <div className="flex justify-center gap-1 mb-4">
            {[7, 14, 21, 33, 42, 45].map((num, i) => (
              <LottoBall key={num} number={num} size="lg" animate delay={i * 100} />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary">로또 일기</span>
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            매주 로또 번호를 기록하고<br />
            꿈과 감성을 함께 담는 서비스입니다
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="font-bold text-base">주요 기능</h3>

          <div className="bg-surface rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                &#9999;&#65039;
              </div>
              <div>
                <h4 className="font-bold text-sm mb-0.5">번호 기록</h4>
                <p className="text-xs text-muted leading-relaxed">
                  매주 구매한 로또 번호를 메모, 꿈과 함께 기록하세요. 터치 친화적인 번호 선택 UI로 쉽게 입력할 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-xl flex-shrink-0">
                &#127942;
              </div>
              <div>
                <h4 className="font-bold text-sm mb-0.5">당첨 확인</h4>
                <p className="text-xs text-muted leading-relaxed">
                  회차별로 내 번호와 당첨번호를 자동 비교해요. 몇 개 맞았는지 한눈에 확인할 수 있어요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                &#128203;
              </div>
              <div>
                <h4 className="font-bold text-sm mb-0.5">기록 타임라인</h4>
                <p className="text-xs text-muted leading-relaxed">
                  과거 기록을 날짜순으로 돌아볼 수 있어요. 나만의 로또 히스토리를 감성적으로 확인하세요.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-xl flex-shrink-0">
                &#128176;
              </div>
              <div>
                <h4 className="font-bold text-sm mb-0.5">희망 저금통</h4>
                <p className="text-xs text-muted leading-relaxed">
                  로또에 쓴 금액을 추적하고, &quot;당첨되면 뭐 할래?&quot; 위시리스트를 만들어보세요. 꿈을 구체적으로 그려보는 재미가 있어요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-border">
          <p className="text-xs text-muted">
            로또 일기 v1.0
          </p>
          <p className="text-[10px] text-muted mt-1">
            희망과 꿈을 담아 만들었습니다
          </p>
        </div>
      </main>
    </>
  );
}
